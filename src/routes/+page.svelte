<script lang="ts">
	import {FileBox,MoveRight,Save,Book} from "lucide-svelte";
</script>

<div class="mx-auto max-w-7xl">
	<div class="mx-auto max-w-4xl text-center">
		<h2 class="text-3xl font-bold tracking-tight text-primary-500 sm:text-4xl">
			Enhance your experience of Let's School.
		</h2>
		<p class="my-6 text-lg leading-8">
			Let's School Central has the best tools to enhance your experience of Let's School.
			<br/>
			From quality of life mods to guides on how to get the most out of your game, we've got you covered.
		</p>
		<button class="btn btn-lg variant-filled-primary">
			Get started
			<MoveRight class="ml-2"/>
		</button>
	</div>
	<div class="mx-auto mt-12 max-w-2xl sm:mt-20 lg:max-w-none">
		<dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3 lg:divide-x divide-surface-300 dark:divide-surface-700">
			<div class="flex flex-col lg:pl-8">
				<dt class="text-base font-semibold leading-7 flex gap-6 mb-6 items-center">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-500">
						<FileBox/>
					</div>
					<span class="text-3xl text-secondary-500">Mods.</span>
				</dt>
				<dd class="mt-1 flex flex-auto flex-col text-base leading-7">
					<p class="flex-auto">
						We have a wide range of mods to enhance your experience of Let's School.
						<br/>
						From quality of life mods to full conversion mods, we've got you covered.
					</p>
					<div class="mt-6 flex gap-6 lg:justify-between">
						<button class="btn btn-sm variant-outline-surface">
							Learn more
							<MoveRight class="ml-2 w-4 h-4"/>
						</button>
						<div class="flex justify-center items-center">
							<span class="badge variant-filled-surface">Feature in early version.</span>
						</div>
					</div>
				</dd>
			</div>
			<div class="flex flex-col lg:pl-8">
				<dt class="text-base font-semibold leading-7 flex gap-6 mb-6 items-center">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-500">
						<Save/>
					</div>
					<span class="text-3xl text-secondary-500">Saves.</span>
				</dt>
				<dd class="mt-1 flex flex-auto flex-col text-base leading-7">
					<p class="flex-auto">
						Save your progress on a secure cloud server and access it from any device.
						<br/>
						Keep them private or share your creativity with the world.
					</p>
					<div class="mt-6 flex gap-6 lg:justify-between">
						<button class="btn btn-sm variant-outline-surface">
							Learn more
							<MoveRight class="ml-2 w-4 h-4"/>
						</button>
						<div class="flex justify-center items-center">
							<span class="badge variant-filled-surface">Feature in early version.</span>
						</div>
					</div>
				</dd>
			</div>
			<div class="flex flex-col lg:pl-8">
				<dt class="text-base font-semibold leading-7 flex gap-6 mb-6 items-center">
					<div class="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-500">
						<Book/>
					</div>
					<span class="text-3xl text-secondary-500">Guides.</span>
				</dt>
				<dd class="mt-1 flex flex-auto flex-col text-base leading-7">
					<p class="flex-auto">
						Learn how to get the most out of your game with our guides.
						<br/>
						From beginner to advanced, there's something for everyone.
					</p>
					<div class="mt-6 flex gap-6 lg:justify-between">
						<button class="btn btn-sm variant-outline-surface">
							Learn more
							<MoveRight class="ml-2 w-4 h-4"/>
						</button>
						<div class="flex justify-center items-center">
							<span class="badge variant-filled-surface">Still work in progress.</span>
						</div>
					</div>
				</dd>
			</div>
		</dl>
	</div>
	<div class="mx-auto max-w-4xl text-center mt-16 lg:mt-36">
		<h2 class="text-3xl font-bold tracking-tight text-primary-500 sm:text-5xl italic">
			Free and open source.
			<br/>
			Forever.
		</h2>
		<p class="mt-6 text-lg leading-8">
			Let's School Central is free and <a href="https://github.com/LetsSchoolCentral" class="underline">open source software</a>.
			<br/>
			All data is stored on a <a href="https://www.scaleway.com/en/security-and-resilience/" class="underline">secure cloud server in the EU respecting GDPR</a>.
		</p>
	</div>
</div>
